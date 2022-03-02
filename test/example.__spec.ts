import test from 'japa';
import supertest from 'supertest';
import User from 'App/Models/User';
// test.group('Example', ()=> {
//   test('assert sum', (assert)=> {
//     assert.equal(2 + 2, 4);
//   })
// });
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
test.group('Welcome to /', ()=>{

  test('a / ta vindo certinho', async (assert)=>{
    
    // const { text } = await supertest(BASE_URL).get('/').expect(200);
    // console.log(text);
    await supertest(BASE_URL).get('/').expect(200);
  });


  test('espero que usuário seja admin', async (assert)=>{
    const user = await User.find('1c816e6e-ab6c-4261-831d-99bb170edaba');
    
    
    assert.equal(user.is_admin, true);
  });
  // //unico a ser rodado nos testes.
  // test.only('vamo vê se salva o usuário', async (assert)=>{
  //   const user = new User();
  //   user.name='umtal';
  //   user.email='umemaildetal@gmail.com';
  //   user.password='umasenhadetal';
  //   await user.save();
  //   assert.notEqual(user.password, 'umasenhadetal');
  // });
});