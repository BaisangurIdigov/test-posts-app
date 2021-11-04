const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');

const postsDB = router.db.get('posts')
const commentsDB = router.db.get('comments')
router.db.create('/posts')
router.db.remove('/posts/:id')
router.db.create('/comments')
router.db.update('/comments/:id')
router.db.remove('/comments/:id')
router.db.update(`/posts/:id`)

server.get("/post/:id", (req,res)=> {
    const id = req.params.id
    const onePost = postsDB.toJSON()
    const posts = onePost.filter((item) => item.id === Number(id))
    const comments = commentsDB.filter((item)=> Number(item.postId) === posts[0].id)
    const obj = {
        posts,
        comments
    }
    res.json(obj)
})

server.use(router);
server.listen(4000, () => {
    console.log(`JSON Server is running on 4000`);
});