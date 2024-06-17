const mockAxios = jest.genMockFromModule("axios");

mockAxios.create = jest.fn(() => mockAxios);

mockAxios.get = jest.fn();

mockAxios.interceptors = {
  request: {
    use: jest.fn(),
    eject: jest.fn(),
  },
  response: {
    use: jest.fn(),
    eject: jest.fn(),
  },
};

export default mockAxios;
