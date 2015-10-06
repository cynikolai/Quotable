function generate_quote(quote, person)
{
	var quote_new = quote;
	var quote_array = quote_new.split(" ");
	var prev_word = quote_array[quote_array.length - 1];
	var new_word = generate_next_word(prev_word,person);
	quote_new += " ";
	quote_new += new_word;
	if(new_word[new_word.length - 1] == ".")
	{
		return quote_new;
	}
	else if(new_word[new_word.length - 1] == "?")
	{
		return quote_new;
	}
	else if(new_word[new_word.length - 1] == "!")
	{
		return quote_new;
	}	
	else
	{
		return generate_quote(quote_new, person);
	}
}

function generate_reverse_quote(quote,person)
{
	var quote_new = quote;
	var quote_array = quote_new.split(" ");
	var prev_word = quote_array[0];
	var new_word = generate_prev_word(prev_word,person);
	if(new_word[new_word.length - 1] == ".")
	{
		return quote_new;
	}
	else if(new_word[new_word.length - 1] == "?")
	{
		return quote_new;
	}
	else if(new_word[new_word.length - 1] == "!")
	{
		return quote_new;
	}
	else
	{
		quote_new = new_word + " " + quote_new;
		return generate_reverse_quote(quote_new, person);
	}
}

function generate_next_word(prev_word,person)
{	
	var possible_words = [];
	for(i = 0; i < person.first.length; i++)
	{
		if(person.first[i] == prev_word)
		{
			possible_words.push(person.second[i]);
		}
	}
	var random_index = Math.floor(Math.random() * possible_words.length);
	return possible_words[random_index];
}

function generate_prev_word(prev_word,person)
{	
	var possible_words = [];
	for(i = 0; i < person.second.length; i++)
	{
		if(person.second[i] == prev_word)
		{
			possible_words.push(person.first[i]);
		}
	}
	var random_index = Math.floor(Math.random() * possible_words.length);
	return possible_words[random_index];
}

function generate_person(name,data)
{
	var array1 = [];
	var array2 = [];
	var data_array = data.split(" ");
	for(var i = 0; i < data_array.length-1; i++)
	{
		array1[i] = data_array[i];
		array2[i] = data_array[i+1];
	}
	var new_person = {first:array1, second:array2};
	return new_person;
}

function add_new_character()
{
	var char_count_new = parseInt(localStorage.getItem("char_count"));
	var character_name = document.getElementById("char_name");
	var character_data = document.getElementById("char_data");
	var new_character = 1;
	var character_box = document.getElementById("character_list");
	for(i =0; i< char_count_new; i++)
	{
		if(localStorage.getItem("char_count" + i) == character_name.value)
		{
			new_character = 0;
		}
	}
	if(new_character)
	{
		var character_item = document.createElement("button");
		character_item.setAttribute("type", "button");
		character_item.setAttribute("id", character_name.value);
		character_item.setAttribute("onclick", "button_clicked(this.id)");
		character_item.setAttribute("class", "list-group-item");
		character_item.innerHTML = character_name.value;	
		localStorage.setItem("char_count"+char_count_new, character_name.value);
		char_count_new += 1;
		localStorage.setItem("char_count", char_count_new);
		var character_box = document.getElementById("character_list");
		character_box.appendChild(character_item);
	}
	localStorage.setItem(character_name.value,character_data.value);
}

function add_chat(name, text)
{
	var chat_panel = document.getElementById("chat_panel");
	var chat_item = document.createElement("p");
	chat_item.setAttribute("style", "margin-left:15px");
	chat_item.innerHTML = "<b>" + name + "</b>" + ": " + text;
	chat_panel.insertBefore(chat_item,chat_panel.firstChild);
}

function button_clicked(button_id)
{
	var character_name = document.getElementById("char_name");
	var character_data = document.getElementById("char_data");
	character_name.value = button_id;
	character_data.value = localStorage.getItem(button_id);
}

function color_map(mood_original)
{
	mood = (mood_original + parseInt(localStorage.getItem("color_cycle"))) % 5;
	if(mood == 1)
	{	
		return "#9ACD32"; // green
	}
	else if(mood == 2)
	{
		return "#D67F80";	// red
	}
	else if(mood == 3)
	{
		return "#FFEEAD"; // yellow
	}	
	else if(mood == 4)
	{
		return "#599ACE"; // blue
	}
	else
	{
		return "#CC99CC"; // purple
	}
}

function starter_word(data_new,person_new)
{
	var start1;
	data_array = data_new.split(" ");
	start_array = [];
	start_array.push(data_array[0]);
	for(i=1; i < data_array.length; i++)
	{
		if(data_array[i-1][data_array[i-1].length-1] == "." || data_array[i-1][data_array[i-1].length-1] == "!" || data_array[i-1][data_array[i-1].length-1] == "?")
		{
			start_array.push(data_array[i]);
		}
	}
	var random_val = Math.floor(Math.random() * start_array.length);
	start1 = start_array[random_val];

	if(parseInt(localStorage.getItem("cycle_count")) > 0 && Math.floor(Math.random() * 2))
	{
		var prev_sentence = localStorage.getItem("previous_sentence");
		least_found_word = "";
		least_found_count = -1;
		prev_array = prev_sentence.split(" ");
		for(i = 2; i < prev_array.length - 1; i++)
		{
			var count = 0;
			for(j = 0; j < person_new.first.length; j++)
			{
				if(prev_array[i] == person_new.first[j])
				{
					count++;
				}
			}
			if(count > 0 && least_found_count == -1)
			{
				least_found_count = count;
				least_found_word = prev_array[i];
			}
			else if(count > 0 && count < least_found_count)
			{
				least_found_count = count;
				least_found_word = prev_array[i];
			}
		}
		if(least_found_word == "")
		{
			data_array = data_new.split(" ");
			start_array = [];
			start_array.push(data_array[0]);
			for(i=1; i < data_array.length; i++)
			{
				if(data_array[i-1][data_array[i-1].length-1] == "." || data_array[i-1][data_array[i-1].length-1] == "!" || data_array[i-1][data_array[i-1].length-1] == "?")
				{
					start_array.push(data_array[i]);
				}
			}
			var random_val = Math.floor(Math.random() * start_array.length);
			start1 = start_array[random_val];
		}
		else
		{
			start1 = least_found_word;
		}
	}
	return start1;
}

function quotes_generate()
{
	var cycle = parseInt(localStorage.getItem("cycle_count")) % parseInt(localStorage.getItem("char_count"));	
	var color = color_map(cycle);
	document.body.style.backgroundColor = color;
	var quote_name_new = localStorage.getItem("char_count" + cycle);
	
	var quote_name = document.getElementById("quotename");
	quote_name.innerHTML = "-" + quote_name_new;

	var data_new = localStorage.getItem(quote_name_new);
	var person_new = generate_person(quote_name_new,data_new);

	var start1 = starter_word(data_new,person_new);
	var quote_text_new = generate_reverse_quote(generate_quote(start1,person_new),person_new);

	var quote_text = document.getElementById("quotetext");
	quote_text.style.fontSize = String(Math.floor(300 / Math.sqrt(quote_text_new.length)) + 1) + "px";
	quote_text.innerHTML= quote_text_new;
	
	add_chat(quote_name_new,quote_text_new);
	localStorage.setItem("cycle_count", parseInt(localStorage.getItem("cycle_count"))+1);

	localStorage.setItem("previous_sentence", quote_text_new);
}

function converse()
{
	var id = setInterval(quotes_generate, 3000);
	localStorage.setItem("stop_key",id);
}

function stop_converse()
{
	var id = parseInt(localStorage.getItem("stop_key"));
	clearInterval(id);
}

var color_cycle = Math.floor(Math.random()) * 5;
localStorage.setItem("color_cycle",color_cycle);
localStorage.setItem("stop_key","none");
localStorage.setItem("char_count", 0);
localStorage.setItem("cycle_count", 0);
