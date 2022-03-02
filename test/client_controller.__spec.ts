import test from 'japa';
import supertest from 'supertest';

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
const data = {
  "user":{
    "uuid":"1c816e6e-ab6c-4261-831d-99bb170edaba",
    "name":"administrador",
    "email":"administrador@gmail.com","password":"$bcrypt$v=98$r=10$iLegFA8Xe9Q7HsFHwhhLnA$XObpd6kBzqcIfTigCj6Ol2BBXL1Mrd8","is_client":0,
    "is_seller":0,
    "is_admin":1,
    "is_logged":0,
    "created_at":"2022-03-01T15:58:14.000-03:00",
    "updated_at":"2022-03-01T15:58:14.000-03:00",
    "productsInFavorites":[],
    "clientProfile":null,
    "productsInCart":[]
  }
};
const CLIENT_TOKEN = '';

test.group('[ClientController][/client][cliente autorizado]', ()=>{

  test('[index][GET /] o status deve ser 200.', async (assert)=>{

    await supertest(BASE_URL).get('/client').expect(200);

  });

  test('[index][GET /] o usuário é cliente.', async (assert)=>{

    const { body } =  await supertest(BASE_URL).get('/client');
    
    assert.notEqual(body.user.clientProfile, null);
  });
}) 