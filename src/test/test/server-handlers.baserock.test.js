const { rest } = require('msw');
const { handlers } = require('../../../src/test/server-handlers');

// Mock the process.env.NODE_ENV
process.env.NODE_ENV = 'test';

describe('Auth Provider API Handlers', () => {
  let req, res, ctx;

  beforeEach(() => {
    req = {
      body: {}
    };
    res = jest.fn();
    ctx = {
      delay: jest.fn().mockReturnValue(jest.fn()),
      status: jest.fn().mockReturnValue(jest.fn()),
      json: jest.fn().mockReturnValue(jest.fn())
    };
  });

  it('should return 400 if password is missing', async () => {
    req.body = { username: 'testuser' };
    
    await handlers[0].resolver(req, res, ctx);

    expect(ctx.delay).toHaveBeenCalledWith(0);
    expect(ctx.status).toHaveBeenCalledWith(400);
    expect(ctx.json).toHaveBeenCalledWith({ message: 'password required' });
  });

  it('should return 400 if username is missing', async () => {
    req.body = { password: 'testpass' };
    
    await handlers[0].resolver(req, res, ctx);

    expect(ctx.delay).toHaveBeenCalledWith(0);
    expect(ctx.status).toHaveBeenCalledWith(400);
    expect(ctx.json).toHaveBeenCalledWith({ message: 'username required' });
  });

  it('should return username if both username and password are provided', async () => {
    req.body = { username: 'testuser', password: 'testpass' };
    
    await handlers[0].resolver(req, res, ctx);

    expect(ctx.delay).toHaveBeenCalledWith(0);
    expect(ctx.json).toHaveBeenCalledWith({ username: 'testuser' });
  });
});