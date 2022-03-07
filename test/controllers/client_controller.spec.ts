import test from 'japa';
import supertest from 'supertest';
import { createClientProfile, createToken, deleteClientProfile, deleteToken, IClientProfile, IToken } from '../utils';

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`;

let NOT_CLIENT: IToken;
let CLIENT_LOGGED: IToken;
let CLIENT_NOT_LOGGED: IToken;
let CLIENTE_PROFILE: IClientProfile;

test.group('[ClientController]', (group)=>{
  group.before(async()=>{
    CLIENT_LOGGED = await createToken({
      is_logged: true,
      is_client: true
    });

    CLIENTE_PROFILE = await createClientProfile(CLIENT_LOGGED.tokenDecoded.uuid);

    CLIENT_NOT_LOGGED = await createToken({
      is_logged: false,
      is_client: true
    });

    NOT_CLIENT = await createToken({
      is_logged: true,
      is_client: false
    });
  });
  group.after(async()=>{
    //await deleteToken();
  });

  test('[GET /client][public] não deve ser exibido sem token', async (assert)=>{

    const { status } = await supertest(BASE_URL)
    .get(`/client/umidqualquer`);
    assert.equal(status, 403);
   
  });

  test('[GET /client][public] é um token valido, porem não deve ser de cliente', async (assert)=>{

    const {body, status} = await supertest(BASE_URL)
    .get('/client/umidqualquer')
    .set({Authorization: `Bearer ${NOT_CLIENT.token}`});
    assert.equal(status, 403);

  });

  test('[GET /client][public] é um token valido, porem o usuário está deslogado', async (assert)=>{

    const {body, status} = await supertest(BASE_URL)
    .get('/client/umidqualquer')
    .set({Authorization: `Bearer ${CLIENT_NOT_LOGGED.token}`});
    assert.equal(status, 401);

  });

  test('[GET /client][private:client] é um token valido e o usuário é um cliente logado', async (assert)=>{

    const { status } = await supertest(BASE_URL)
    .get(`/client/${CLIENT_LOGGED.tokenDecoded.uuid}`)
    .set({Authorization: `Bearer ${CLIENT_LOGGED.token}`});
    assert.equal(status, 200);

  });

  test('[GET /client][private:admin] usuário cliente não tem acesso a essa rota', async (assert)=>{

    const { token, tokenDecoded } = CLIENT_LOGGED;
    const { status, body } = await supertest(BASE_URL)
    .get(`/clients`)
    .set({Authorization: `Bearer ${token}`});
    assert.equal(status, 403);

  });
  
  test('[GET /client][private:client] informações do cliente logado', async (assert)=>{

    const { token, tokenDecoded } = CLIENT_LOGGED;
    const { status, body } = await supertest(BASE_URL)
    .get(`/client/${tokenDecoded.uuid}`)
    .set({Authorization: `Bearer ${token}`});
    assert.equal(status, 200);

  });


  test('[GET /client][private:client] deve ser 404 se o usuário não existir', async (assert)=>{

    const { token, tokenDecoded } = CLIENT_LOGGED;
    const { status, body } = await supertest(BASE_URL)
    .get(`/client/umuuidinexistente`)
    .set({Authorization: `Bearer ${token}`});
    assert.equal(status, 404);

  });

  test('[GET /client][private:client] create client profile', async (assert)=>{
    await deleteClientProfile();

    const { token } = CLIENT_LOGGED;
    const { status } = await supertest(BASE_URL)
    .post(`/clients`).send({
      cpf: '201.203.204-05'
    })
    .set({Authorization: `Bearer ${token}`});
    assert.equal(status, 203);

  });

  test('[GET /client][private:client] update client profile', async (assert)=>{

    const { token, tokenDecoded } = CLIENT_LOGGED;
    const cpf = '201.203.204-05';

    await supertest(BASE_URL)
    .put(`/clients/${CLIENTE_PROFILE.profile.uuid}`).send({
      cpf: cpf
    })
    .set({Authorization: `Bearer ${token}`});
  
    const { body } = await supertest(BASE_URL)
    .get(`/client/${tokenDecoded.uuid}`)
    .set({Authorization: `Bearer ${token}`});

    assert.equal(body.cpf, cpf);
  });

  test('[GET /client][private:client] delete client profile', async (assert)=>{
    await deleteToken();

    const {token, tokenDecoded}: IToken = await createToken({
      is_logged: true,
      is_client: true
    });

    await createClientProfile(tokenDecoded.uuid);
   
    const { status } = await supertest(BASE_URL)
    .delete(`/clients/${tokenDecoded.uuid}`)
    .set({Authorization: `Bearer ${token}`});

    const client = await supertest(BASE_URL)
    .get(`/client/${tokenDecoded.uuid}`)
    .set({Authorization: `Bearer ${token}`});

    assert.equal(status, 204);
    assert.equal(client.status, 404);
    assert.equal(client.body.message, 'client profile dont exists');
  });
});

