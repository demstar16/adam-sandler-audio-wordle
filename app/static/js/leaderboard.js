    let user_score_div = document.getElementById('user_score');
    // my not so efficient way of getting the data
    let dummy = document.getElementById('data');
    let top10_div = document.getElementById('top10');

    let user_score = document.createElement('p');
    user_score.innerText = user_score_div.getAttribute('userScore');

    let top10InvalidString = dummy.textContent;
    let top10ValidString = top10InvalidString.replace(/'/g, '"');
    let top10 = JSON.parse(top10ValidString);
    console.log(top10);

    let text = document.createElement('p');
    text.innerText = "Your Score: ";

    let score_div = document.createElement('div');
    score_div.className = 'yourScore'

    score_div.appendChild(text);
    score_div.appendChild(user_score);
    user_score_div.appendChild(score_div);

    top10.forEach(function(item) {
        let username = document.createElement('p');
        username.innerText = item[0];

        let score = document.createElement('p');
        score.innerText = item[1];

        let score_row = document.createElement('div')
        score_row.className = 'score_row'

        score_row.appendChild(username);
        score_row.appendChild(score);
        top10_div.appendChild(score_row)
    });
