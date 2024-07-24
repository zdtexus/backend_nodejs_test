const { prisma } = require('../prisma/prisma-client');

const FollowController = {
    followUser: async (req, res) => {
        const { followingId } = req.body;
        const  userId = req.user.userId;

        if(followingId === userId) {
            return res.status(500).json({ error: 'You cant follow yoursalf'})
        }

        try {
            const existingSubscription = await prisma.follows.findFirst ({
                where: {
                    AND: [
                        {followerId: userId},
                        {followingId }
                    ]
                }
            })

            if(existingSubscription) {
                return res.status(400).json({ error: 'Subscription already exist'})
            }

            await prisma.follows.create({
                data: {
                    follower: { connect: { id: userId }},
                    following: { connect: { id: followingId }},

                }
            })

            res.status(201).json({ messege: 'Subscription created successfully'})
        } catch (error) {
            console.error('Follow error', error);
            res.status(500).json({ error: 'Internal server error'})
        }

    },
    unFollowUser: async (req, res) => { 
        const { followingId } = req.body;
        const  userId = req.user.userId;

        try {
            const follows = await prisma.follows.findFirst({
                where: {
                    AND: [
                        {followerId: userId},
                        {followingId}
                    ]
                }
            })

            if(!follows) {
                return res.status(404).json({ error: 'You are not subscribed to this user'})
            }

            await prisma.follows.delete({
                where: {id: follows.id}
            })

            res.status(201).json({ massege: 'You unsubscribed'})
        } catch (error) {
            console.error('Unfollow error', error);
            res.status(500).json({ error: 'Internal server error'})
        }
    }
}

module.exports = FollowController;
