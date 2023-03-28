# Application Integration

- [Application Integration](#application-integration)
  - [AWS Step Functions](#aws-step-functions)
  - [Amazon MQ (Apache ActiveMQ)](#amazon-mq-apache-activemq)
  - [Amazon SQS (Amazon Simple Queue Service)](#amazon-sqs-amazon-simple-queue-service)
  - [Amazon SNS (Amazon Simple Notification Service)](#amazon-sns-amazon-simple-notification-service)
  - [Amazon SWF (Amazon Simple Workflow)](#amazon-swf-amazon-simple-workflow)

## AWS Step Functions

- Design and run workflows that stitch together services such as AWS Lambda and Amazon ECS into feature-rich applications
- With the output of one step acting as input into the next
- Step Functions automatically triggers and tracks each step, and retries when there are errors, so your application executes in order and as expected.

## Amazon MQ (Apache ActiveMQ)

- A managed message broker service for Apache ActiveMQ that makes it easy to set up and operate message brokers in the cloud.
- AWS do all the work (provisioning, setup, and maintenance of ActiveMQ) for you.

## Amazon SQS (Amazon Simple Queue Service)

- A fully managed message queuing service that enables you to decouple and scale microservices, distributed systems, and serverless applications
- Two types of message queues
  - Standard queues offer maximum throughput, best-effort ordering, and at-least-once delivery
  - SQS FIFO queues are designed to guarantee that messages are processed exactly once, in the exact order that they are sent.

## Amazon SNS (Amazon Simple Notification Service)

- A highly available, durable, secure, fully managed pub/sub messaging service that enables you to decouple microservices, distributed systems, and serverless applications.
- Can be used to both fan out messages to a large number of subscriber endpoints for parallel processing and notifications to end users for mobile push, SMS, email.

## Amazon SWF (Amazon Simple Workflow)

- A fully-managed state tracker and task coordinator in the cloud.
