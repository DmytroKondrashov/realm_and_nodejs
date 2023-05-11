export default function listener(messages, changes) {
  // Update UI in response to inserted objects
  if (changes?.insertions) {
    changes.insertions.forEach((index) => {
      let insertedMessage = messages[index];
      console.log(`${insertedMessage._id} -  ${insertedMessage.text}`)
    });
  }
}
