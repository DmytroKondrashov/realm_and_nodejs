import Realm from "realm";
import listener from './listener.js'

const MessageSchema = {
  name: "Message",
  properties: {
    _id: "int",
    text: "string",
    status: "string?",
    owner_id: "string?",
  },
  primaryKey: "_id",
};

const realm = await Realm.open({
  path: "realm-files/myrealm",
  schema: [MessageSchema],
});

let messages = realm.objects("Message");
messages.addListener(listener);

process.stdin.on("data", data => {
  data = data.toString().replaceAll('\n', '')
  let message;
  realm.write(() => {
    message = realm.create("Message", {
      _id: messages.length,
      text: data,
      status: "Open",
    });
  })
})

function reader() {
  messages.forEach((message) => {
    console.log(`${message._id} -  ${message.text}`)
  })
}

reader()
