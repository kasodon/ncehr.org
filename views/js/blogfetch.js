
const url = 'https://resources.ncehr.org/wp-json/wp/v2/posts?per_page=3';




fetch(url)
.then(response => {
	return response.json();
}) 
.then((data) => {
    console.log(data);
    let img1 = 'https://resources.ncehr.org/wp-content/uploads/2020/03/banne.png';
    let title1 = (data[0].title.rendered);
    let excerpt1 = (data[0].excerpt.rendered);
    let link1 = (data[0].link);

    let img2 = 'https://resources.ncehr.org/wp-content/uploads/2020/03/rslider2-1170x500.jpg';
    let title2 = (data[1].title.rendered);
    let excerpt2 = (data[1].excerpt.rendered);
    let link2 = (data[1].link);

    let img3 = 'https://resources.ncehr.org/wp-content/uploads/2020/03/rslider3-1170x500.jpg';
    let title3 = (data[2].title.rendered);
    let excerpt3 = (data[2].excerpt.rendered);
    let link3 = (data[2].link);

    document.getElementById('blog-img-one').src = img1;
    document.getElementById('blog-title-one').innerHTML = title1;
    document.getElementById('blog-excerpt-one').innerHTML = excerpt1;
    let linkone = document.getElementById('blog-link-one');
    linkone.href = link1;

    document.getElementById('blog-img-two').src = img2;
    document.getElementById('blog-title-two').innerHTML = title2;
    document.getElementById('blog-excerpt-two').innerHTML = excerpt2;
    let linktwo = document.getElementById('blog-link-two');
    linktwo.href = link2;

    document.getElementById('blog-img-three').src = img3;
    document.getElementById('blog-title-three').innerHTML = title3;
    document.getElementById('blog-excerpt-three').innerHTML = excerpt3;
    let linkthree = document.getElementById('blog-link-three');
    linkthree.href = link3;

    })
 .catch(err => {
  console.log(err);
});
