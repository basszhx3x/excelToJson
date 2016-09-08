function myFunction1() {
			
			var person = new Object();
			person.title = "aaaaaaaaa";
			person.age = "26";
			//document.getElementById("demo").innerHTML="person" + person.title + person.age;
			var result = "";
			if (person.age === 26) {
				person.age = "56"
			}
			for (x in person) {
				result = result + "   and   " + person[x];
			}
			document.getElementById("demo").innerHTML=result;

		}