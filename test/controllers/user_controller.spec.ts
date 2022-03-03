import User from 'App/Models/User';
import test from 'japa';
import supertest from 'supertest';

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`;
const VALID_CREDENTIALS = {
	email:"usuariotesteemail@gmail.com",
	password:"umdoistresquatro"
};
let TOKEN = '';

test.group('[UserController][][public]',(group)=>{
  group.after(async ()=>{
    console.log('banco de dados foi limpado apos os testes')
    const user = await User.findBy('email', VALID_CREDENTIALS.email);
    if(user){
      await user.delete();
      TOKEN = '';
    }
  });

  test('[POST /signup] criar usuário sem erro.', async (assert)=>{
    
    const {body} = await supertest(BASE_URL).post('/signup').send({
      name: 'usuarioteste',
      email: 'usuariotesteemail@gmail.com',
      password: 'umdoistresquatro'
    });
    
    assert.equal(body.message, "user is created");
    TOKEN = body.token;
    
  });

  test('[DELETE /signout] deslogar com sucesso.', async ()=>{
    
    await supertest(BASE_URL).delete('/signout')
      .set({Authorization: `Bearer ${TOKEN}`}).expect(200);
  
  });

  test('[POST /signin] entrar com email errado.', async (assert)=>{
    
    VALID_CREDENTIALS.email = 'umemaildetal@gmail.cm';
    const {body} = await supertest(BASE_URL).post('/signin').send(VALID_CREDENTIALS);
    assert.equal(body.message, "user don't exists");

  });

  test('[POST /signin] entrar com password errado.', async (assert)=>{
    
    VALID_CREDENTIALS.email= 'usuariotesteemail@gmail.com';
    VALID_CREDENTIALS.password = 'senhaerrada'
    const {body} = await supertest(BASE_URL).post('/signin').send({...VALID_CREDENTIALS});
    assert.equal(body.message, "password is invalid");

  });

  test('[POST /signin] entrar com email e senha certos.', async (assert)=>{
    
    VALID_CREDENTIALS.password="umdoistresquatro"
    const {body} = await supertest(BASE_URL).post('/signin').send(VALID_CREDENTIALS);
    assert.notEqual(body.token, null);

  });
});