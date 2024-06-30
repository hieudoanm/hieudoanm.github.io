# DevOps

## Table of Content

- [DevOps](#devops)
  - [Table of Content](#table-of-content)
  - [IaaS](#iaas)
  - [Blockchain](#blockchain)
  - [Design](#design)
  - [Game Engines](#game-engines)

## IaaS

|                |                 | [AWS][aws]                                | [Azure][azure]                     | [Google Cloud][google-cloud] | [IBM Cloud][ibm-cloud] | [Digital Ocean][do]                 |
| -------------- | --------------- | ----------------------------------------- | ---------------------------------- | ---------------------------- | ---------------------- | ----------------------------------- |
| Database       | Key-Value       | [ElasticCache][aws-elasticache]           | Cache for Redis                    |                              |                        | Redis                               |
| Database       | Document        |                                           |                                    | Firestore                    |                        | MongoDB                             |
| Database       | Relational      | [RDS][aws-rds]                            | Database for SQL                   |                              |                        | PostgreSQL                          |
| Database       | Relational      |                                           |                                    |                              |                        | MySQL                               |
| Database       | Search Engine   | [OpenSearch][aws-opensearch]              |                                    |                              |                        |                                     |
| Database       | Multi Model     |                                           | Cosmos DB                          |                              |                        |                                     |
| Files          | Block Storage   | [EBS][aws-ebs]                            | Volumes Block Storage              |                              |                        |                                     |
| Files          | Block Storage   | [EFS][aws-efs]                            | Spaces Object Storage              |                              |                        |                                     |
| Files          | Data Storage    | [S3][aws-s3]                              |                                    |                              |                        |                                     |
| PaaS           |                 | [Elastic Beanstalk][aws-elasticbeanstalk] | App Service                        | Google App Engine            |                        | App Platform                        |
| Serverless     |                 | [Lambda][aws-lambda]                      | Functions                          | Cloud Functions              |                        |                                     |
| Container      | Registry        | [ECR][aws-ecr]                            | Container Registry                 | Container Registry           |                        |                                     |
| Container      | Kubernetes      | [EKS][aws-eks]                            | AKS                                | Kubernetes Engine            |                        |                                     |
| Compute        |                 | [EC2][aws-ec2]                            | Virtual Machines (Linux & Windows) | Compute Engine               |                        |                                     |
| Networking     | Load Balancing  | [ELB][aws-elb]                            | Load Balancer                      | Cloud Load Balancing         |                        | [Load Balancers][do-load-balancers] |
| Networking     | DNS             | [Route 53][aws-route53]                   | DNS                                | Cloud DNS                    |                        | DNS                                 |
| Networking     | Virtual Network | [VPC][aws-vpc]                            | Virtual Network                    | VPC                          |                        | VPC                                 |
| Networking     | Firewall        |                                           | Firewall                           |                              |                        | [Firewalls][do-firewalls]           |
| Networking     | IPs             |                                           |                                    |                              |                        | [Reserved IPs][do-reserved-ips]     |
|                |                 | [Systems Manager][aws-systems-manager]    | Key Vault                          |                              |                        |                                     |
| BaaS           |                 |                                           |                                    | Firebase                     |                        |                                     |
| Message Broker |                 | Service Bus                               |                                    |                              |                        |                                     |
| CI/CD          |                 |                                           |                                    |                              |                        |                                     |

## Blockchain

- [Ethereum](https://ethereum.org)
- [Hedera](https://hedera.com)
- [Polkadot](https://polkadot.network)
- [Solana](https://solana.com)

## Design

- [Adobe][adobe]
  - [Photoshop][adobe-photoshop]
  - [Illustrator][adobe-illustrator]
- [Figma](https://www.figma.com)

## Game Engines

- [Photon Engine](https://www.photonengine.com)
- [Unity](https://unity.com)
- [Unreal Engine](https://www.unrealengine.com)

[adobe]: https://www.adobe.com
[adobe-illustrator]: https://www.adobe.com/products/illustrator.html
[adobe-photoshop]: https://www.adobe.com/products/photoshop.html
[aws]: https://aws.amazon.com/
[aws-ebs]: https://aws.amazon.com/ebs/
[aws-ec2]: https://aws.amazon.com/ec2/
[aws-ecr]: https://aws.amazon.com/ecr/
[aws-efs]: https://aws.amazon.com/efs/
[aws-eks]: https://aws.amazon.com/eks/
[aws-elasticache]: https://aws.amazon.com/elasticache/
[aws-elasticbeanstalk]: https://aws.amazon.com/elasticbeanstalk/
[aws-elb]: https://aws.amazon.com/elasticloadbalancing/
[aws-lambda]: https://aws.amazon.com/lambda/
[aws-opensearch]: https://aws.amazon.com/opensearch-service/
[aws-rds]: https://aws.amazon.com/rds/
[aws-route53]: https://aws.amazon.com/route53/
[aws-s3]: https://aws.amazon.com/s3/
[aws-systems-manager]: https://aws.amazon.com/systems-manager/
[aws-vpc]: https://aws.amazon.com/vpc/
[azure]: https://azure.microsoft.com/
[do]: https://docs.digitalocean.coms
[do-firewalls]: https://docs.digitalocean.com/products/networking/firewalls/
[do-load-balancers]: https://docs.digitalocean.com/products/networking/load-balancers/
[do-reserved-ips]: https://docs.digitalocean.com/products/networking/reserved-ips/
[google-cloud]: https://cloud.google.com/
[ibm-cloud]: https://www.ibm.com/cloud/
