import bcrypt from 'bcrypt';

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('admins').del();

  const insertedData = await knex('admins').insert([
    {
      name: 'Bijay Poudel',
      email: 'poudelbijaya25@gmail.com',
      phone_number: '9816221701',
      password: await bcrypt.hash('bijju123', 10),
      profile_image: null,
      role: '0',
      status: '0',
      created_at: new Date(),
    },
  ]);
  return insertedData;
};
