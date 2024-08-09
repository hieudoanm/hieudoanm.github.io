# DevOps

## Docker

### Image Layers

- Each layer is an image itself, just one without a human-assigned tag. They have auto-generated IDs though.
- Each layer stores the changes compared to the image it's based on.
- An image can consist of a single layer (that's often the case when the squash command was used).
- Each instruction in a Dockerfile results in a layer. (Except for multi-stage builds, where usually only the layers in the final image are pushed, or when an image is squashed to a single layer).
- Layers are used to avoid transferring redundant information and skip build steps which have not changed (according to the Docker cache).

### Cached

- Its parent image exists in the cache
- The Dockerfile instruction corresponding to the layer is unchanged (or in case of ADD/COPY, the involved files are exactly the same)
- Cache Gotcha #1: `RUN apt-get update`
- Using the Cache Well: it is better to update the package management files (`package.json` & `requirements.txt`), you only have to do it once.

### Image Repositories

| Group    | Type              | Name                                                          |
| -------- | ----------------- | ------------------------------------------------------------- |
| Database | Key-Value         | [memcached](https://hub.docker.com/_/memcached)               |
| Database | Key-Value         | [redis](https://hub.docker.com/_/redis)                       |
| Database | Wide Column       | [cassandra](https://hub.docker.com/_/cassandra)               |
| Database | Document Oriented | [mongo](https://hub.docker.com/_/couchdb)                     |
| Database | Document Oriented | [mongo](https://hub.docker.com/_/mongo)                       |
| Database | Relational        | [cockroachdb](https://hub.docker.com/r/cockroachdb/cockroach) |
| Database | Relational        | [mysql](https://hub.docker.com/_/mysql)                       |
| Database | Relational        | [postgres](https://hub.docker.com/_/postgres)                 |
| Database | Graph             | [dgraph](https://hub.docker.com/r/dgraph/dgraph)              |
| Database | Graph             | [neo4j](https://hub.docker.com/_/neo4j)                       |
| Database | Search Engine     | [elasticsearch](https://hub.docker.com/_/elasticsearch)       |
| Database | Search Engine     | [elasticsearch](https://hub.docker.com/_/solr)                |
| Database | Multi-Model       | [faunadb](https://hub.docker.com/r/fauna/faunadb)             |
| OS       | Linux             | [Alpine](https://hub.docker.com/_/alpine)                     |
| OS       | Linux             | [Ubuntu](https://hub.docker.com/_/ubuntu)                     |
| Runtime  | Golang            | [Golang](https://hub.docker.com/_/golang/)                    |
| Runtime  | Java              | [OpenJDK](https://hub.docker.com/_/openjdk)                   |
| Runtime  | JavaScript        | [Node.js](https://hub.docker.com/_/node/)                     |
| Runtime  | Python            | [Python](https://hub.docker.com/_/python/)                    |
| Server   |                   | [nginx](https://hub.docker.com/_/nginx)                       |

## PaaS / IaaS

|                |                 | Render   | Vercel     | [AWS][aws]                                | [Azure][azure]                     | [Google Cloud][google-cloud] | [IBM Cloud][ibm-cloud] | [Digital Ocean][do]                 | Open Source            |
| -------------- | --------------- | -------- | ---------- | ----------------------------------------- | ---------------------------------- | ---------------------------- | ---------------------- | ----------------------------------- | ---------------------- |
| Database       | Key-Value       | Redis    | KV (Redis) | [ElasticCache][aws-elasticache]           | Cache for Redis                    |                              |                        | Redis                               |                        |
| Database       | Document        |          |            |                                           |                                    | Firestore                    |                        | MongoDB                             |                        |
| Database       | Relational      | Postgres | Postgres   | [RDS][aws-rds]                            | Database for SQL                   |                              |                        | PostgreSQL                          |                        |
| Database       | Relational      |          |            |                                           |                                    |                              |                        | MySQL                               |                        |
| Database       | Search Engine   |          |            | [OpenSearch][aws-opensearch]              |                                    |                              |                        |                                     |                        |
| Database       | Multi Model     |          |            |                                           | Cosmos DB                          |                              |                        |                                     |                        |
| Files          | Block Storage   |          | Blob       | [EBS][aws-ebs]                            | Volumes Block Storage              |                              |                        |                                     |                        |
| Files          | Block Storage   |          |            | [EFS][aws-efs]                            | Spaces Object Storage              |                              |                        |                                     |                        |
| Files          | Data Storage    |          |            | [S3][aws-s3]                              |                                    |                              |                        |                                     |                        |
| PaaS           |                 |          |            | [Elastic Beanstalk][aws-elasticbeanstalk] | App Service                        | Google App Engine            |                        | App Platform                        |                        |
| Serverless     |                 |          |            | [Lambda][aws-lambda]                      | Functions                          | Cloud Functions              |                        |                                     |                        |
| Container      | Registry        |          |            | [ECR][aws-ecr]                            | Container Registry                 | Container Registry           |                        |                                     |                        |
| Container      | Kubernetes      |          |            | [EKS][aws-eks]                            | AKS                                | Kubernetes Engine            |                        |                                     |                        |
| Compute        |                 |          |            | [EC2][aws-ec2]                            | Virtual Machines (Linux & Windows) | Compute Engine               |                        |                                     |                        |
| Networking     | Load Balancing  |          |            | [ELB][aws-elb]                            | Load Balancer                      | Cloud Load Balancing         |                        | [Load Balancers][do-load-balancers] |                        |
| Networking     | DNS             |          |            | [Route 53][aws-route53]                   | DNS                                | Cloud DNS                    |                        | DNS                                 |                        |
| Networking     | Virtual Network |          |            | [VPC][aws-vpc]                            | Virtual Network                    | VPC                          |                        | VPC                                 |                        |
| Networking     | Firewall        |          |            |                                           | Firewall                           |                              |                        | [Firewalls][do-firewalls]           |                        |
| Networking     | IPs             |          |            |                                           |                                    |                              |                        | [Reserved IPs][do-reserved-ips]     |                        |
|                |                 |          |            | [Systems Manager][aws-systems-manager]    | Key Vault                          |                              |                        |                                     |                        |
| BaaS           |                 |          |            |                                           |                                    | Firebase                     |                        |                                     |                        |
| Message Broker |                 |          |            | Service Bus                               |                                    |                              |                        |                                     |                        |
| CI/CD          |                 |          |            |                                           |                                    |                              |                        |                                     |                        |
| IaC            |                 |          |            | [CloudFormation][aws-cloudformation]      |                                    |                              |                        |                                     | [Terraform][terraform] |

## Blockchain

- [Ethereum](https://ethereum.org)
- [Hedera](https://hedera.com)
- [Polkadot](https://polkadot.network)
- [Solana](https://solana.com)

## Game Engines

- [Photon Engine](https://www.photonengine.com)
- [Unity](https://unity.com)
- [Unreal Engine](https://www.unrealengine.com)

[aws]: https://aws.amazon.com/
[aws-cloudformation]: https://aws.amazon.com/cloudformation/
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
[terraform]: https://www.terraform.io/
