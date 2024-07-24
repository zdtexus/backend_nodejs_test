const { prisma } = require('../prisma/prisma-client');

const LikeController = {
    likePost: async (req, res) => {
        const { postId } = req.body;
        const userId = req.user.userId;

        if (!postId) {
            return res.status(400).json({ error: 'Post ID is required' });
        }

        try {
            const existingLike = await prisma.like.findFirst({
                where: { postId, userId }
            });

            if (existingLike) {
                // Если пост уже нравится пользователю, удаляем лайк
                await prisma.like.delete({
                    where: { id: existingLike.id }
                });
                return res.json({ message: 'Post unliked successfully' });
            } else {
                // Если пост не нравится пользователю, создаем новый лайк
                const like = await prisma.like.create({
                    data: { postId, userId }
                });
                return res.json(like);
            }

        } catch (error) {
            console.error('Error handling like post', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    unLikePost: async (req, res) => {
        const { id } = req.params;
        const userId = req.user.userId;

        if (!id) {
            return res.status(400).json({ error: 'Post ID is required' });
        }

        try {
            const existingLike = await prisma.like.findFirst({
                where: { postId: id, userId }
            });

            if (!existingLike) {
                return res.status(400).json({ error: 'You have not liked this post' });
            }

            // Удаляем лайк, если он существует
            await prisma.like.delete({
                where: { id: existingLike.id }
            });

            return res.json({ message: 'Post unliked successfully' });

        } catch (error) {
            console.error('Error unliking post', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = LikeController;
