# AWS Architecture

## Introduction

- Describe basic characteristics of deploying and operating in the AWS Cloud
- Describe basic AWS Cloud architectual principles
- Understand the AWS Cloud value proposition

## The AWS Well-Architecture Framework

### Introduction (The AWS Well-Architecture Framework)

- Asses and improve architectures
- Understand how design decisions impact business
- Learn the five pillars and design principles

### 5 Pillars

- Security
  - Areas
    - Identity and access management (IAM)
    - Detective controls
    - Infrastructure protection
    - Data protection
    - Incident response
  - Design Principles
    - Implement security at all layers
    - Enable traceability
    - Apply principle of least privilege
    - Focus on securing your system
    - Automate
- Reliability
  - Areas
    - Recover from issues/failures
    - Apply best practices in:
      - Foundations
      - Change management
      - Failure management
    - Anticipate, respond, and prevent failures
  - Design Principles
    - Test recovery procedures
    - Automatically recover
    - Scale horizontally
    - Stop guessing capacity
    - Manage change in automation
- Performance efficiency
  - Area
    - Select customizble solutions
    - Review to continually innovate
    - Monitor AWS Services
    - Consider the trade-offs
  - Design Principles
    - Democratize advanced technologies
    - Go global in minutes
    - Use a serverless architectures
    - Experiment more often
    - Have mechanical sympathy
- Cost optimization
  - Areas
    - Use cost-effective resources
    - Matching supply with demand
    - Increase expenditure awareness
    - Optimize over time
  - Design Principles
    - Adopt a consumption model
    - Measure overall efficiency
    - Reduce spending on data center operations
    - Analyze and attribute expenditure
    - Use managed services
- Operational excellence
  - Manage and automate changes
  - Respond to events
  - Define the standards

## Fault Tolerance and High Availability

- Fault Tolerance
  - Ability of a system to remain operational
  - Built-in redundancy of an application components
- High Availability
  - Systems are generally functioning and accessible
  - Downtime is minimized
  - Minimal human intervention is required
  - Minimal up-front financial investment
- High Availability: On Premises and AWS
  - Traditional: Expensive and Only mission-critical applications
  - AWS:
    - Multiple Servers
    - Availability Zones
    - Regions
    - Fault-tolerant services
- High Availability Service Tools
  - Elastic load balancers
  - Elastic IP addresses
  - Amazon Route 53
  - Auto Scaling
  - Amazon CloudWatch
- Fault Tolerance Tools
  - Amazon Simple Queue Service
  - Amazon Simple Storage Service
  - Amazon Relational Database Service

## Web Hosting
