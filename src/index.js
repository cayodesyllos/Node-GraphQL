const { GraphQLServer } = require('graphql-yoga')
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken')
const auth = require('./config/auth')
const resolvers = require('./app/resolvers')
const typeDefs = require('./app/schemas')
// var s3 = new AWS.S3({
//     apiVersion: '2006-03-01',
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });
const autheticate = async (resolve, root, args, context, info) => {
  let token;
  console.log(info)
  if (info.path.key.toString() === 'addSession' ||
    (info.path.prev != undefined &&
      info.path.prev.key === 'addSession')) { }
  else {
    console.log('*******')
    try {
      token = jwt.verify(context.request.get("Authorization"), auth.secret);
    } catch (e) {
      return new Error("Not authorised");
    }
  }
  const result = await resolve(root, args, context, info);
  return result;
};


const server = new GraphQLServer({
  resolvers,
  typeDefs,
  context: req => ({ ...req }),
  middlewares: [autheticate]
});

server.start(() => console.log('server listening'))