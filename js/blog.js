// Load blogs when page opens
loadBlogs();

/* -------------------------
   Add Blog
------------------------- */

function addBlog() {

    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;

    if (title === "" || content === "") {
        alert("Please fill all fields");
        return;
    }

    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    blogs.unshift({
        title: title,
        content: content,
        likes: 0,
        comments: []
    });

    localStorage.setItem("blogs", JSON.stringify(blogs));

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

    loadBlogs();
}

/* -------------------------
   Load Blogs
------------------------- */

function loadBlogs() {

    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    let output = "";

    blogs.forEach((blog, index) => {

        let commentHTML = "";

        blog.comments.forEach(comment => {
            commentHTML += `
            <div class="comment-item">
                ${comment}
            </div>
            `;
        });

        output += `

        <div class="blog-card">

            <div class="blog-title">
                ${blog.title}
            </div>

            <div class="blog-content">
                ${blog.content}
            </div>

            <div class="blog-footer">

                <button class="btn btn-danger"
                    onclick="deleteBlog(${index})">
                    Delete
                </button>

                <button class="btn btn-success like-btn"
                    onclick="likeBlog(${index})">
                    ❤️ ${blog.likes}
                </button>

            </div>

            <div class="comment-box">

                <input
                    type="text"
                    id="comment${index}"
                    class="comment-input"
                    placeholder="Write a comment...">

                <button
                    class="btn btn-primary"
                    onclick="addComment(${index})">
                    Comment
                </button>

                ${commentHTML}

            </div>

        </div>

        `;
    });

    document.getElementById("blogContainer").innerHTML = output;
}

/* -------------------------
   Delete Blog
------------------------- */

function deleteBlog(index) {

    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    blogs.splice(index, 1);

    localStorage.setItem("blogs", JSON.stringify(blogs));

    loadBlogs();
}

/* -------------------------
   Like Blog
------------------------- */

function likeBlog(index) {

    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    blogs[index].likes++;

    localStorage.setItem("blogs", JSON.stringify(blogs));

    loadBlogs();
}

/* -------------------------
   Add Comment
------------------------- */

function addComment(index) {

    let commentText =
        document.getElementById("comment" + index).value;

    if (commentText === "") {
        alert("Enter a comment");
        return;
    }

    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    blogs[index].comments.push(commentText);

    localStorage.setItem("blogs", JSON.stringify(blogs));

    loadBlogs();
}

/* -------------------------
   Search Blog
------------------------- */

function searchBlog() {

    let search =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    let blogs =
        JSON.parse(localStorage.getItem("blogs")) || [];

    let output = "";

    blogs.forEach((blog, index) => {

        if (
            blog.title.toLowerCase().includes(search)
        ) {

            output += `

            <div class="blog-card">

                <div class="blog-title">
                    ${blog.title}
                </div>

                <div class="blog-content">
                    ${blog.content}
                </div>

                <button
                    class="btn btn-success">
                    ❤️ ${blog.likes}
                </button>

            </div>

            `;
        }

    });

    document.getElementById("blogContainer").innerHTML = output;
}

/* -------------------------
   Dark Mode
------------------------- */

function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

}