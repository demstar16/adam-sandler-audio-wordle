    // -----------User Stats ---------------------
    let user_stats_div = document.getElementById('user_stats');
    let dummy1 = document.getElementById('data1');
    let userStatsInvalidString = dummy1.textContent;
    let userStatsValidString = userStatsInvalidString.replace(/'/g, '"');
    userStatsValidString = userStatsValidString.replace('(', '[');
    userStatsValidString = userStatsValidString.replace(')', ']');
    userStatsValidString = userStatsValidString.replace(/None/g, 'null');
    console.log(userStatsInvalidString);
    console.log(userStatsValidString);
    let user_stats = JSON.parse(userStatsValidString);
    let username;
    if (user_stats[0][1] != null) {
        username = user_stats[0][1];
    } else {
        username = user_stats[0][0];
    }

    let score = user_stats[0][2];
    let text = document.createElement('p');
    text.innerHTML = "<b>Your Score</b> (" + username + "): <b>" + score + "</b>";

    user_stats_div.appendChild(text);

    // ------------ TOP 10 --------------------
    // my not so efficient way of getting the data
    let dummy = document.getElementById('data');
    let top10_div = document.getElementById('top10');

    let top10InvalidString = dummy.textContent;
    console.log(top10InvalidString);
    let top10ValidString = top10InvalidString.replace(/'/g, '"');
    top10ValidString = top10ValidString.replace(/None/g, 'null');
    let top10 = JSON.parse(top10ValidString);

    let rank = 1
    top10.forEach(function(item) {
        let rankString = rank + ".) ";

        let nameElement = document.createElement('p');
        let name;
        if (item[1] != null) 
        {
            name = item[1];
        }
        else 
        {
            name = item[0];
        }
        if (name == username){
            nameElement.innerHTML = "<b>" + rankString + "</b><b>" + name + "</b>";
        } else {
            nameElement.innerHTML = rankString + name;
        }
        let score = document.createElement('p');
        score.innerText = item[2];

        let score_row = document.createElement('div')
        score_row.className = 'score_row'

        score_row.appendChild(nameElement);
        score_row.appendChild(score);
        top10_div.appendChild(score_row);
        rank = rank + 1;
    });
