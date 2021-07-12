import axios from 'axios';
const app = 'http://localhost:8080/users';

const parseAxios = (v) => {
  const pars = {
    ...v,
    headers: '',
    config: '',
    request: { ClientRequest: '', socket: '', connection: '' },
  };
  console.log(pars);
  return v;
};

const testStatus = async (user: object, expectStatus: number) => {
  const result = await axios
    .post(app, user)
    .then((v) => v)
    .catch((reason) => reason.response);
  expect(result.status).toBe(expectStatus);
  if (result.data) return result.data.error;
  return 'OK';
};

const testUserDup = async (
  okUser: object,
  failUser: object,
  dupColumn: string,
  dupValue: string,
) => {
  await testStatus(okUser, 201);
  const fail = await testStatus(failUser, 400);
  expect(fail).toBe(`${dupColumn} dup: ${dupValue} is already exist`);
};

describe('User create 테스트', () => {
  let user = {
    intra_id: 'sayi',
    nickname: 'intra_dup',
    auth_token: 'sayi token',
    icon_path: 'sayi is sayi',
  };
  beforeEach(async () => await axios.delete(`${app}/clear`));

  it('intra_id 중복 확인', async () =>
    await testUserDup(
      user,
      { ...user, nickname: 'fail' },
      'intra_id',
      user.intra_id,
    ));

  it('nickname 중복 확인', async () =>
    await testUserDup(
      user,
      { ...user, intra_id: 'fail' },
      'nickname',
      user.nickname,
    ));
});
