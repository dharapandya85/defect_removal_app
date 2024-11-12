import logging
import os
import subprocess
from os import environ
from urllib.parse import urlparse
from pathlib import Path
import argparse
import boto3
#from neptune_python_utils.endpoints import Endpoints
#from neptune_python_utils.bulkload import BulkLoad

logger = logging.getLogger()
logger.setLevel(logging.INFO)

parser = argparse.ArgumentParser(description='Bulk load properties of vertices into Neptune.')
parser.add_argument('--data_prefix', help='s3 object prefix for uploading graph data')
parser.add_argument('--temp_folder', help='temp folder for processing the data')
parser.add_argument('--neptune_endpoint', help='neptune endpoint')
parser.add_argument('--neptune_port', help='neptune port')
parser.add_argument('--region', help='the region of neptune is running')
parser.add_argument('--neptune_iam_role_arn', help='arn of iam role of Neptune for loading data')

args = parser.parse_args()

modelS3Url = urlparse(environ['MODEL_PACKAGE'], allow_fragments=False)
originModelArtifact = f's3:/{modelS3Url.path}'
graphDataUrl = urlparse(environ['GRAPH_DATA_PATH'], allow_fragments=False)
graphDataPath = f's3:/{graphDataUrl.path}/graph/'
targetDataPath = f"{args.data_prefix}/{environ['JOB_NAME']}"
tempFolder = args.temp_folder

dataArgs = (originModelArtifact, graphDataPath, targetDataPath, tempFolder)

prepareDataCmd=Path(os.path.abspath(__file__)).parent.joinpath('prepare-data.sh')
logger.info(f"| {prepareDataCmd} {' '.join(dataArgs)}")
subprocess.check_call([prepareDataCmd] + list(dataArgs))
logger.info(f'Prepared graph data for bulk load...')

neptune_client=boto3.client('neptune',region_name=args.region)

response=neptune_client.start_loader_job(
    source=targetDataPath,
    iamRoleArn=args.neptune_iam_role_arn,
    region=args.region,
    failOnError=True,
    parallelism='HIGH',
    updatesSingleCardinalityProperties=True
)

job_id=response['jobId']       
#load_status = bulkload.load_async()
logger.info(f'Bulk load request from {targetDataPath} is submmitted with job ID:{job_id}.')

def get_loader_job_status(job_id):
        status_response=neptune_client.describe_loader_job(jobId=job_id)
        status =status_response['status']
        logger.info(f"Bulk load status is {status_response}")
        return status

import time

while True:
        status=get_loader_job_status(job_id)
        if status in ["LOAD_COMPLETED","LOAD_FAILED","LOAD_CANCELLED"]:
                break
        time.sleep(10)
        
logger.info('Bulk load request is completed with final status:{status}.')