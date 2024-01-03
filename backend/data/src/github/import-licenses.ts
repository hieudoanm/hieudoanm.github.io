import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const main = async () => {
  const base = 'https://api.github.com';
  const response = await axios.get(`${base}/licenses`);
  const { data: licenses } = response;
  const prismaClient = new PrismaClient();
  await prismaClient.$connect();
  for (const license of licenses) {
    const { key: id, name, spdx_id: spdx, node_id: node } = license;
    const response = await axios.get(`${base}/licenses/${id}`);
    console.log(`id=${id}`);
    const {
      data: {
        html_url: html,
        description,
        implementation,
        body: content = '',
        permissions = [],
        conditions = [],
        limitations = [],
      },
    } = response;
    const body = {
      id,
      name,
      spdx,
      node,
      html,
      description,
      implementation,
      body: content,
      permissions,
      conditions,
      limitations,
    };
    await prismaClient.license.upsert({
      create: body,
      update: body,
      where: { id },
    });
  }
};

main();
