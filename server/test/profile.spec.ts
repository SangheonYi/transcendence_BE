import axios from 'axios';
import { testGetStatus, testPutStatus } from './test-util.spec';
const host = 'http://localhost:8080';
let sayi = {
  intra_id: 'sayi',
  nickname: 'sayi nick',
  auth_token: 'sayi token',
  icon: 'sayi is sayi',
};
let match = {
  p1_id: 'sayi',
  p2_id: 'taekim',
  winner: 'sayi',
};
let match2 = {
  p1_id: 'sayi',
  p2_id: 'taekim',
  winner: 'taekim',
};
let match3 = {
  p1_id: 'taekim',
  p2_id: 'sayi',
  winner: 'sayi',
};
let match4 = {
  p1_id: 'taekim',
  p2_id: 'sayi',
  winner: 'taekim',
};
let match5 = {
  p1_id: 'taekim',
  p2_id: 'jinkim',
  winner: 'jinkim',
};
let match6 = {
  p1_id: 'taekim',
  p2_id: 'jinkim',
  winner: 'jinkim',
};
let match7 = {
  p1_id: 'taekim',
  p2_id: 'jinkim',
  winner: 'jinkim',
};
const testCreateUser = async (
  okUser: object,
  failUser: object,
  dupColumn: string,
  dupValue: string,
) => {
  await testPostStatus(host, okUser, 201);
  await testPostStatus(host, okUser, 201);
  expect(fail).toBe(`${dupColumn}: ${dupValue} is already exist`);
};

describe('profile create 테스트', () => {
  beforeEach(async () => {
    await axios.delete(`${host}/match-history`); // clear match-history table
    await axios.delete(`${host}/admin/clear`); // clear user table
    await axios.post(`${host}/admin`, sayi); // clear user table
    await axios.patch(`${host}/admin`, sayi); // clear user table
    await axios.post(`${host}/admin`, sayi); // clear user table
  });

  it('intra_id 중복 확인', async () =>
    await testCreateUser(
      user,
      { ...user, nickname: 'fail' },
      'intra_id',
      user.intra_id,
    ));
});
