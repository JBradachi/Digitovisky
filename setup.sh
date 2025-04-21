clear
echo "
 ____       _               
/ ___|  ___| |_ _   _ _ __  
\___ \ / _ \ __| | | | '_ \ 
 ___) |  __/ |_| |_| | |_) |
|____/ \___|\__|\__,_| .__/ 
                     |_|    
"
ip=""
itoken=""
explanation=""
echo "Bem vindo ao setup do digitovisky"
while true;
do 
	read -p "Voce deseja ver o tutorial de como realizar a configuração do iToken?

	Digite 'S' para sim ou 'N' para não: " explanation
	if [[ $explanation == "S" || $explanation == "s" ]]; then
		clear
		echo "
 _ _____     _              
(_)_   _|__ | | _____ _ __  
| | | |/ _ \| |/ / _ \ '_ \ 
| | | | (_) |   <  __/ | | |
|_| |_|\___/|_|\_\___|_| |_|

"
		echo "O iToken é um token de autenticação que os professores"
		echo "utilizarão para fazer login no sistema, impedindo que"
		echo "alunos acessem o sistema como professores. Pode ser "
		echo "definido arbitrariamente pelo professor (qualquer iToken"
		echo "serve)"
		echo ""
		break
	elif [[ $explanation == "N" || $explanation == "n" ]]; then
		break
	else
		echo "Por favor, digite S ou N!!"
	fi
done
echo ""
read -p "Por favor, digite o valor do iToken: " itoken
clear
echo "Agora, vamos configurar o IP do servidor"
while true;
do 
	read -p "Voce deseja ver o tutorial de como realizar a configuração do ip? 

	Digite 'S' para sim ou 'N' para não: " explanation
	if [[ $explanation == "S" || $explanation == "s" ]]; then
		clear

echo "
 ___ ____  
|_ _|  _ \ 
 | || |_) |
 | ||  __/ 
|___|_|    
"           
		echo "O ip do host é um valor que corresponde a uma identificação"
		echo "do computador. Se se computador for um linux, ele pode ser"
		echo "obtido digitando o comando 'ifconfig' no seu terminal e procurando"
		echo "por 'inet'. Caso não encontre dessa forma. Procure por um valor que "
		echo "comece por 192.168 (por exemplo, 192.168.0.1). Esse será o valor do ip."
		echo ""
		echo "Caso o computador seja um windows, o ip pode ser obtido através"
		echo "do comando 'ipconfig' e procurando por 'IPv4 Address'. Ele também "
		echo "será um valor que comece por 192.168 (por exemplo, 192.168.21.123)."
		echo ""
		echo "Caso você não encontre nenhum valor que comece por 192.168, você pode "
		echo "tentar outros, mas não conseguimos garantir que o sistema funcionará"
		echo "corretamente. Contudo, é uma ideia boa realizar esse teste."
		echo ""
		break
	elif [[ $explanation == "N" || $explanation == "n" ]]; then
		break
	else
		echo "Por favor, digite S ou N!!"
	fi
done
echo ""
read -p "Por favor, digite o valor do ip: " ip

if [[ $ip == "" || $itoken == "" ]]; then
	echo "Por favor, preencha todos os campos"
	exit 1
fi 
if [ -e "./digitovsky/backend/.env" ]; then
	echo "iToken=$itoken" > ./digitovsky/backend/.env
	echo "ip=$ip" >> ./digitovsky/backend/.env
	echo "Configuração realizada com sucesso!!!"
else
	touch ./digitovsky/backend/.env
	echo "iToken=$itoken" > ./digitovsky/backend/.env
	echo "ip=$ip" >> ./digitovsky/backend/.env
	echo ""
	echo "Configuração realizada com sucesso!!!"
fi

