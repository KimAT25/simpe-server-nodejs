import prisma from "../db";

export const getOneUpdate = async (req, res) => {
    const update = await prisma.update.findFirstOrThrow({
        where: {
            id: req.params.id
        }
    });

    res.json({ data: update });
}

export const getUpdates = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {  
            Update: true
        }
    })

    const updates = products.reduce((allUpdates, product) => [...allUpdates, ...product.Update], [])

    res.json({ data: updates })
}

export const createUpdate = async (req, res) => {
    const product = await prisma.product.findFirst({
        where: {
            id: req.body.productId,
            belongsToId: req.user.id
        }
    })

    if (!product) {
        return res.json({ message: 'nope' });
    }

    const update = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            status: req.body.status,
            product: {
                connect: {
                    id: product.id
                }
            }
        }
    })

    res.json({ data: update});
}

export const updateUpdate = async (req, res) => {    
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            Update: true
        }
    });

    const updates = products.reduce((allUpdates, product) => [...allUpdates, ...product.Update], []);
    const match = updates.find(update => update.id === req.params.id);

    if (!match) {
        return res.json({ message: 'nope' });
    }

    const updateUpdate = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    });

    res.json({ data: updateUpdate });
}

export const deleteUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            Update: true
        }
    });

    const updates = products.reduce((allUpdates, product) => [...allUpdates, ...product.Update], []);
    const match = updates.find(update => update.id === req.params.id);

    if (!match) {
        return res.json({ message: 'nope' });
    }

    const deleteUpdate = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    });

    res.json({ data: deleteUpdate });
}