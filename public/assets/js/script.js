document.addEventListener('DOMContentLoaded', function() {
    new App();
});

class App {
    constructor(){
        this.handleCommentForm();
    }

    handleCommentForm(){
        const commentForm = document.querySelector('form.comment-form');

        if (null == commentForm) {
            return;
        }

        commentForm.addEventListener('submit', async(e) => {
            e.preventDefault();

        const response = await fetch('/ajax/comments',{
            method: 'POST',
            body: new FormData(e.target)
        });

        if(!response.ok){
            return;
        }

        const json = await response.json();

        // console.log(json);

        if (json.code === 'COMMENT_ADDED_SUCCESSFULY'){
            const commentList = document.querySelector('comment-list');
            const commentCount = document.querySelector('comment-count');
            const commentContent = document.querySelector('comment-content');console.log(commentContent);
            commentList.lastElementChild.scrollIntoView();
            commentCount.innerText = json.numberOfComments;
            commentContent.value = '';

        }
    });
}
}