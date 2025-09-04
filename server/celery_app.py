from celery import Celery
from settings.settings import settings

celery = Celery("ai_tasks", broker=settings.RABBITMQ_URL, backend=settings.REDIS_URL)

celery.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    result_expires=3600,
    task_acks_late=True,
    worker_prefetch_multiplier=1,
    broker_heartbeat=30,
    broker_connection_retry=True,
)
