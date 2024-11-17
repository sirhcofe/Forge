# PeerFlux

A peer to peer learning platform with verifiable knowledge proof

# Smart Contract
https://sepolia.scrollscan.com/address/0x49C8F5864aCF0104DB72A60Fa91A3DC99804d893
https://sepolia.scrollscan.com/address/0xb7F3F887a0eb86964EB075607E9F41f645E38ad7
https://sepolia.scrollscan.com/address/0xe4fa8eBCa01411ed4c7Dd460bFd3De9ca19900eB

# Problem Statements

Let's say you are hiring someone, and you come across someone super stacked individual, boasts great achievements on socials. You hired him, but few months down the road, you realize his knowledge barely scratches the surface. What happen next? Time and money wasted, worse, startup dies. That's the real cost of passive learning—it looks good on paper, but doesn't always hold in practice. Plus, there's often no verifiable proof of the depth of an individual knowledge.

# Solution

PeerFlux helps users build credibility by allowing users to work on practical projects rather than tutorials. And instead of having a teacher or AI to grade the project, the projects are peer-reviewed. The requirement to explain their work to the evaluators, ensures that evaluatees are required to actually understand what they are working on, as opposed to blindly copying answers when say AI is grading the project instead.

Every evaluation outcome will be attested on-chain, keeping the evaluation record transparent regardless of pass or fail. Also, with every projects completed, knowledge points are rewarded on-chain, along with zk badges for every project completed successfully. This opens up alot of potentials in the future, for example having verifiable proof of knowledge in a specific field for hiring; or a weighted voting system whereby individuals with higher knowledge points hold more voting power.

# How it's made

The project is deployed on Scroll, with Web3Auth as the account abstraction provider. Push Protocol is used for notifying users on evaluation matching, and chat system for communication between both parties. After the evaluations, evaluators will feedback the project, in which are attested with Sign Protocol. On success project completion, schema hook is implemented to award knowledge points to the evaluatee, along with zk talent badge for the specific project. Finally, Graph is the indexer for the project. Matchmaking for evaluator => evaluatee is also done using Sign Protocol Attestation, to create a 1 week expiry attestation for the evaluation to happen, if attestation has been revoked, then user will not be able to evaluate anymore and fail the project
