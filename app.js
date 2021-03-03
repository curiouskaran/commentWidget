const mainComment = document.getElementById('comments');
let mainCommentcount = 0; 

const stringToHtml = (str) => document.createRange().createContextualFragment(str);

const generateCommentId = (parentElement) => {
    if(parentElement === mainComment) {
        return ++mainCommentcount;
    } else  {
        const eleId = parentElement.getAttribute('id');
        
        return `${eleId}.${++(Array.from(document.getElementById(eleId).childNodes).filter(ele => ele.attributes?.class?.value === "comment-conatiner")
        .length)}`;
    }
}

const addMainComment = (event) => {
    mainComment.appendChild(stringToHtml(generateCommentBoxUI()));
    handleAddComment();
}

const generateCommentBoxUI = () => {
    if(document.getElementById('commnet-box')) return '';

    return `
        <div id="commnet-box">
            <input type="text" id="comment-input" autocomplete="off">
            <button id="comment-reply">comment</button>
        </div>`;
};

const generateCommentUI = (commentStr, commentId) => {
    return `
        <div class="comment-conatiner" id=${commentId}>
          <div class="user-info">
            <strong class="user">Test says</strong>
            <div class="comment">${commentStr}</div>
          </div>
          <input type="button" value="reply" class="reply" onclick="handleCommentReply(event)"/>
          <input type="button" value="delete" class="delete" onclick="handleCommentDelete(event)"/>
        </div>`;
}

const handleAddComment = () => {
    const commentBox = document.getElementById('commnet-box');
    const commentInp = document.getElementById('comment-input');
    const replyBtn = document.getElementById('comment-reply');
    const commentId = generateCommentId(commentBox.parentElement);
    replyBtn.addEventListener('click', () => {
        commentBox.parentElement.appendChild(stringToHtml(generateCommentUI(commentInp.value, commentId)));
        commentBox.remove();
    });
}

const handleCommentReply = (event) => {
    console.log('event',event.target.parentElement)
    event.target.parentElement.appendChild(stringToHtml(generateCommentBoxUI()));
    handleAddComment();
    
}

const handleCommentDelete = (event) => {
    event.target.parentElement.remove();
}



