# FreeCodeCamp

- [FreeCodeCamp](#freecodecamp)
  - [Introduction](#introduction)
  - [Cloud Concepts](#cloud-concepts)
  - [AWS Global Infrastructure](#aws-global-infrastructure)
  - [Getting Started](#getting-started)
  - [Hands On](#hands-on)
  - [EC2 Pricing Models](#ec2-pricing-models)
  - [Billing and Pricing](#billing-and-pricing)
  - [Technology Overview](#technology-overview)
  - [Security](#security)
  - [Variation Study](#variation-study)
  - [Summary](#summary)

## Introduction

- Why Get AWS Cloud Practitioner Certified?
  - Who?
    - Prove that you have basic foundational knowledge
    - Focuses on billing and business knowledge
    - Commonly by sales and management
  - Value?: Might not beneficial for developers
  - Should I skip?
    - Easy Win
    - Familiar with the test
    - Directly prepare for Solution Architect Associate
  - Study time: Maximum 20 hours of study
  - Test Center: PSI or Pearson VUE (test from home)
  - Overall: 90 minutes, 65 questions, 70% passing score, $100, valid for 3 years
- Exam Guide Overview
  - Questions: Multiple Choice or Multiple Responses
  - Domains
    - Cloud Concepts 28%
    - Security 24%
    - Technology 36%
    - Billing and Pricing 12%

## Cloud Concepts

- What is Cloud Computing?
  - Other people take care of the server for you instead of your doing that locally
  - You only have to take care of the code and configurations
- Six Advantages and Benefits of Cloud Computing
  - Pay only for what you need - no upfront cost
  - Benefit from massive economy of scale - more people use it, more money you save
  - Elimiate guess work - do not have to worry about scaling up and down
  - Increase speed - deploy new hardware quickly
  - Stop worry about infrastructure - focus on your product
  - Go global quickly - take advantages of data centers around the world
- Types of Cloud Computing
  - Software as a Service - Gmail, Saleforce, Office 365 (Customers)
  - Platform as a Service - Heroku, Elastic Beanstalk, Google App Engine (Developers)
  - Infrastructure as a Service - AWS, Azure, Google Cloud (Admins)
- Cloud Computing Deployment Models
  - Cloud - Start up and new projects: deploy quickly and save money
  - Hybrid (Cloud and On-Premise): uses a lot by banks and fintech companies
  - On-Premise: government and large enterprise

## AWS Global Infrastructure

- Introduction and Map Overview
  - 69 AZs in 22 Regions (1 region has multiple availability zones)
  - Edge Locations are data center owned by trusted partners of Amazon
- Regions
  - Each regions have the minimum of 2 AZs
  - Largest is US-EAST (North Virginia)
  - Not all services a available in all regions but US-EAST-1 has it all
  - US-EAST-1 is the region where you see the billing
- Availability Zones
  - AZs are represented by Region Code with a letter
  - Multi AZs distribution is allowed for back up
  - Latency between AZs is <10ms
- Edge Locations
  - Owned by AWS Partner and connect to AWS directly
  - Serve requests for CloudFront, Route 53, S3 Transfer Acceleration and API Gateway
  - Allows low latency for remote area
- GovCloud Regions
  - Only used by US citizens and hosted in US soils
  - Host Sensetive Information for US Government

## Getting Started

- Creating an AWS Account
- Billing Preferences, Budgets and Alarms
  - My Billing Dashboard => Billing Preference => Turn on the alert you need
  - AWS Budgets => Budgets =>Create new Budgets => Set Budgeted Amount => Email the alarm to you when you reach a certain threshold
  - AWS CloudWatch => Alarms => Set Maximum Amount of Money you want to spend => Email the alarm and SNS topic to notify you when you reach a certain threshold
- Change IAM Users Sign-in Link
  - IAM => Dashboard => Customized Sign In URL
- Activate MFA on Root Account
  - IAM => Dashboard => Turn on MFA to enable 2 factor authentication for your account
- Create individual IAM user
  - IAM => Users => Create new user => Assign to Group (PowerUserAccess is recommended)
- Set a password policy
  - IAM => Dashboard => Apply IAM Password Policy
  - IAM => Users => Security Credentials => Reset Access and Secret Key

## Hands On

- Intro and Regions
  - US-EAST-1 has all the services
- EC2 (Elastic Compute Cloud)
  - To Create new EC2
  - => Choose EC2 Dashboard OR Instances => Launch Instances
  - => Choose AMI (Amazon Machine Image) - Choose an OS
  - => Choose Instance Type - Choose harddisk memory - CPU - CPUs and CPU type
  - => Choose Instance Details - Choose number of instances, network configurations, role for instance (SSM is Simple System Manager)
  - => Choose Storage - Choose RAM
  - => If ask key-pair - Basicaly SSH
  - To Shut it down - Go to Instances => Choose Instance you want to shut down => Actions => Terminate
- Sessions Manager
  - Systems Manager => Sessions Manager (keep logs of who goes into EC2)
- AMI (Amazon Machine Image)
  - EC2 => Instances => Choose Instance you want to shut down => Create an Image
  - Template Server for your business => Important for Auto Scaling Groups
- Auto Scaling Groups
  - EC2 => Auto Scaling Groups
  - => Set up launch configurations
  - => Set up Policies (based on CPU, Traffic, Memory)
  - => Set up Notification
  - If the minimum is 1, if you shut down the only one Instance => It will mark the Instance as unhealthy and spin up new one
  - Delete ASG will delete related Instances
- Elastic Load Balancer
  - Evenly Distribute traffic across Instances
  - EC2 => Load Balancers => Application Load Balancers
  - => Choose Multiple AZs
  - => Choose Target Groups (Instances (Server) or IP (Address))
  - Delete ELB will not delete related Instances
- S3 (Simple Storage Service)
  - Bucket is where to store files
  - Each name have to be unique
- CloudFront
  - CloudFront + S3: Your custom CDN
  - CloudFront => Distributions => Create Distribution => Choose S3
- RDS (Relational Database Service)
  - RDS => Databases
- Lambda
  - Lambda => Functions
  - Can be triggered by multiple services

## EC2 Pricing Models

- Introduction
  - On-Demand
  - Spot
  - Reserved Instances
  - Dedicated
- On-Demand
  - Low cost and flexible
  - On upfront and pay-as-you-go
  - For short term and experiment
- Reserved
  - Long term savings
  - Commit for 1 to 3 years
  - Reduced price based on plans (Standard 75% and Convertible 54%)
  - Payment Options: All Upfront, Partial Upfront, No Upfront
  - Use cases: steady state and predictable usage
  - Can resell and unuse reserved
- Spot
  - AWS has unused compute capacity that they will give out discount to maximize profit
  - Provide discount up to 90% On-Demand Pricing
  - Use cases: for non critical background jobs, can handle interruptions
  - AWS can terminate instances anytime by AWS for other on-demand users, but if they do that, you will not get charged
  - If you terminate, you will be charged
- Dedicated
  - Most Expensive
  - Other plans are multi tenants, you share hardware with other users
  - Dedicated is single tenant, you get an isolated hardware.
- EC2 Pricing CheatSheet (above)

## Billing and Pricing

- Free Services
  - Auto Scaling\*
  - CLoudFormation\*
  - Elastic Beanstalk\*
  - Opsworks
  - Amplify
  - AppSync
  - CodeStar
- AWS Support Plans
  - Basic
    - Email support for Billing and Account
  - Developer
    - Tech Support via Email
    - Genernal Guidance
    - System Impared (<12 hours)
  - Business
    - Tech Support via Email, Chat, Phone
    - Genernal Guidance
    - System Impared (<12 hours)
    - Production System Impared (<4hours)
    - Production System DOWN! (<1hr)
    - Personal Assistant
    - Third-party
  - Enterprise
    - Tech Support via Email, Chat, Phone
    - Genernal Guidance
    - System Impared (<12 hours)
    - Production System Impared (<4hours)
    - Production System DOWN! (<1hr)
    - Business Critical System DOWN!(<15min)
    - Personal Assistant
    - Third-party
- Follow Along - Lets create a support case
  - Support => Support Center
- AWS Marketplace
  - Places to buy or sell softwares
  - Usages will be charged with AWS billing
- Follow Along - Marketplace subscriptions
- AWS Trusted Advisor
  - Automated checklist for best practices
    - Cost Optimization
    - Performance
    - Security
    - Fault Tolerance
    - Service Limits
- Follow Along - Trusted Advisor
- Consolidated Billing
  - Consolidate multiple account into one bill
  - Use Cost Explorer to visualize usage for consolidated Billing
- Consolidated Billing (Volume Discounts)
  - The more you use something, the less it costs
- AWS Cost Explorer
  - Visualize, Understand and manage your costs
  - All bills are consolidated in the master account
  - There are filter and grouping with monthly and daily
- Follow Along - AWS Cost Explorer
- AWS Budgets
  - Plan your service usage, service costs and instance reservations
  - Set up alert for exceeding or approaching services
  - Cost, Usage, Reservation Budgets
  - Monthly, Quarterly or Yearly
- Follow Along - AWS Budgets
- TCO Calculator
  - Total Cost of Ownership
  - This tool is for approximate how much you would save when moving to AwS from on-premises
- Follow ALong - TCO Calculator
  - [AWS TCO Calculator](https://calculator.aws/#/)
- AWS Landing Zone
  - Help Enterprises quickly set up multiple AWS secure accounts
  - AWS Account Vending Machine (AVM): Automatically provisions and configure new accounts via Service Catalog Template
- Resource Groups and Tagging
  - Tags are keywords for Services
  - Resources Groups are a collection of Resources shared one or more tags. Displays based on metrics, alarms and configurations settings
- Follow Along - Resource Groups
- AWS QuickStart
- AWS Cost and Usage Report
- Cost and Usage Follow Along

## Technology Overview

- AWS Organizations and Accounts
- AWS Organizations Follow Along
- AWS Networking
- Database Services
- Provisioning Services
- Computing Services
- Storage Services
- Business Centric Services
- Enterprise Integration
- Logging Services
- Know your Initialisms

## Security

- Shared Responsibility Model
- AWS Compliance programs
- AWS Artifact
- AWS Artifact Follow Along
- Amazon Inspector
- AWS WAF
- AWS Shield
- Penetration Testing
- Guard Duty
- Key Management Service
- Amazon Macie
- Security Groups vs NACLs
- AWS VPN

## Variation Study

- Cloud Service
- Connect Service
- Elastic Transcoder vs Media Convert
- SNS vs SQS
- Inspector vs Trusted Advisor
- ALB vs NLB vs CLB
- SNS vs SES
- Artifact vs Inspector

## Summary
