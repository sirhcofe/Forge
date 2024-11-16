import { PushAPI } from '@pushprotocol/restapi'
import { ENV } from '@pushprotocol/restapi/src/lib/constants'
import { ethers } from 'ethers'

const env = ENV.STAGING
const firstSigner = ethers.Wallet.createRandom()
const secondSigner = ethers.Wallet.createRandom()
console.log('First user privateKey: ', firstSigner.privateKey)

const main = async () => { 
	console.log('Creating 2 users..')
	const firstUser = await PushAPI.initialize(firstSigner, {env})
	const secondUser = await PushAPI.initialize(secondSigner, {env})
	console.log('2 user created')

	console.log('send msg from 1st user to 2nd user')
	await firstUser.chat.send(secondSigner.address, {content: 'Hello from first user', type: 'Text'})

	console.log('Accept request from first user')
	await secondUser.chat.accept(firstSigner.address)

	console.log('Reply back to first user')
	await secondUser.chat.send(firstSigner.address, { content: 'hello back', type: 'Text'})
	await secondUser.chat.send(firstSigner.address, {content: 'Nice meeting you', type: 'Text'})

	console.log('Getting chat history from first user')
	const myChats = await firstUser.chat.list('CHATS')
	myChats.map((chat) => console.log(`last msg from chat user ${chat.msg.fromCAIP10}: ${chat.msg.messageContent}`))

	// console.log('Creating a group chat')
	// const createdGroup = await firstUser.chat.group.create('my group chat', {
	// 	description: 'This is my group chat',
	// 	image: 'data:image/png;base64,iVBORw0K',
	// 	members: [secondSigner.address],
	// 	admins: [],
	// 	private: false,
	// })

	// console.log('Group created with chatID: ', createdGroup.chatId)

	// console.log('Sending message to group chat')
	// await firstUser.chat.send(createdGroup.chatId, { content: 'Hello from group chat 1', type: 'Text' })
	// await secondUser.chat.send(createdGroup.chatId, { content: 'Hello from group chat 2', type: 'Text' })
	// await firstUser.chat.send(createdGroup.chatId, { content: 'Hello from group chat 3', type: 'Text' })
	// await firstUser.chat.send(createdGroup.chatId, { content: 'Hello from group chat 4', type: 'Text' })
	// console.log('Group chat message sent')
}

main()