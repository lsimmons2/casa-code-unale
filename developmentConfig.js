module.exports = {
  site: function(){

  },
  gen: {
    sessionSecret: 'kitty'
  },
  mail: {
    auth: {
      user: 'leooscar.simmons@gmail.com',
      pass: 'Gmailpassword1'
    },
    defaultFromAddress: 'Leo Simmons <leooscar.simmons@gmail.com>'
  },
  github: {
    clientID: '64fa2e057908394c6e0b',
    clientSecret: '55c45cfb8b2656c3ed8375fd9d6cffb810020b46',
    callbackURL: "http://127.0.0.1/app/auth/github/callback"
  },
  linkedin: {
    clientID: '77pb3he1zuow60',
    clientSecret: '0ezOdpX48CeBBURc',
    callbackURL: "http://127.0.0.1/app/auth/linkedin/callback"
  }
};
