import axios from 'axios';
import {
  testPostStatus,
  testPutStatus,
  testPatchStatus,
} from './test-util.spec';
const url = 'http://localhost:8080/admin';
let user = {
  intra_id: 'sayi',
  nickname: 'intra_dup',
  auth_token: 'sayi token',
  icon: 'sayi is sayi',
};

const testCreateUser = async (
  okUser: object,
  failUser: object,
  dupColumn: string,
  dupValue: string,
) => {
  await testPostStatus(url, okUser, 201);
  const fail = await testPostStatus(url, failUser, 400);
  expect(fail).toBe(`${dupColumn}: ${dupValue} is already exist`);
};

describe('admin create 테스트', () => {
  beforeEach(async () => await axios.delete(`${url}/clear`));

  it('intra_id 중복 확인', async () =>
    await testCreateUser(
      user,
      { ...user, nickname: 'fail' },
      'intra_id',
      user.intra_id,
    ));

  it('nickname 중복 확인', async () =>
    await testCreateUser(
      user,
      { ...user, intra_id: 'fail' },
      'nickname',
      user.nickname,
    ));
});

describe('admin update 테스트', () => {
  const updateBody = {
    intra_id: user.intra_id,
    nickname: 'update success',
    icon: user.icon,
  };
  beforeEach(async () => {
    await axios.delete(`${url}/clear`);
    await axios.post(url, user);
  });

  it('intra_id 존재 확인', async () => {
    await testPatchStatus(url, updateBody, 200);
    const fail = await testPatchStatus(
      url,
      { ...updateBody, intra_id: user.icon },
      400,
    );
    expect(fail).toBe(`intra_id: ${user.icon} is not exist`);
  });
});
