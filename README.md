Workshop Nodejs - Twitter API
------------------------
Ce site web permet de récupérer en temps réel le flux de tweet de Twitter grâce à son API.
Les données sont ensuite filtrés afin de récupérer uniquement les tweets qui contiennent les mots "Nissan" et "Toyota". Enfin, un graphique est créer afin de visualiser la popularité des deux marques automobile.

Problèmes rencontrés
----
Le premier problème que je n'ai pas réussi à règler est la customisation du filtre par le client via le site web. Je n'ai pas réussi à importer la fonction resetRules dans le script client.

Le second problème est que si le client arrive modifier les filtres via la fonction resetRules, les autres clients qui utilisent l'application auront ces mêmes changements.