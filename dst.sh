#!/bin/bash

master='../.klei/DoNotStarveTogether/MyDediServer/Master/'
cave='../.klei/DoNotStarveTogether/MyDediServer/Caves/'

dst_dir=(${master} ${cave})

goMaster(){
	cd ~/dst/bin

	if [[ -z `ps -ef | grep -v grep |grep -v "dst.sh"|grep "Master"|sed -n '1P'|awk '{print $2}'` ]]; then
		screen -dm sh overworld.sh && if [[ `echo $?` -eq 0 ]]; 
		then
			echo -n " 😉 地上启动成功~ 😉"
		fi
	else
		echo -n " 😆 地上已经在运行啦~ 😆"
	fi
	
}

goCaves(){
	cd ~/dst/bin
	
	if [[ -z `ps -ef | grep -v grep |grep -v "dst.sh"|grep "Caves"|sed -n '1P'|awk '{print $2}'` ]]; then
		screen -dm sh cave.sh && if [[ `echo $?` -eq 0 ]]; then
			echo -n " 😉 洞穴启动成功~ 😉"
		fi
	else
		echo -n " 😆 洞穴已经在运行啦~ 😆"
	fi
}
go(){
	goMaster
	echo ""
	goCaves
}

stopMaster(){
	ps -ef|grep Master|awk '{print $2}'|xargs kill -9
	if [[ -z `ps -ef | grep -v grep |grep -v "dst.sh"|grep "Master"|sed -n '1P'|awk '{print $2}'` ]]; then
		echo  -n " 🙃 地上关闭成功~ 🙃"
	fi
}
stopCaves(){
	ps -ef|grep Caves|awk '{print $2}'|xargs kill -9
	if [[ -z `ps -ef | grep -v grep |grep -v "dst.sh"|grep "Caves"|sed -n '1P'|awk '{print $2}'` ]]; then
		echo  -n " 🙃 洞穴关闭成功~ 🙃"
	fi
}
stop(){
	stopMaster
	echo ""
    stopCaves
}

# 重启
restartm(){
	stopMaster
	# echo ""
	goMaster
}
restartc(){
	stopCaves
	# echo ""
	goCaves
}
restart(){
	stop
	echo ""
	go
}

# 重置
resetm(){
	del 0
	# echo ""
	goMaster
}
resetc(){
	del 1
	# echo ""
	goCaves
}
reset(){
	del
	echo ""
	go
}

del(){
	[ $1 -eq 0 ]&&stopMaster
	[ $1 -eq 1 ]&&stopCaves
	# echo ""
	# for i in ${dst_dir[@]};
	# do
	# 	if [[ -d ${i}"save" ]]; then
	# 		rm -r ${i}"save"&&rm -r `find ${i} -name "*.txt"` && rm -r ${i}"backup"
	# 		echo -e "\033[32m ##: ${i}'s file already delete! \033[0m"
	# 	fi
	# done
	dir=${dst_dir[$1]}
	if [[ -d ${dir}"save" ]]; then
		rm -r ${dir}"save"&&rm -r `find ${dir} -name "*.txt"` && rm -r ${dir}"backup"
		[ $1 -eq 0 ]&&echo -n "地上文件删除完毕"
		[ $1 -eq 1 ]&&echo -n "洞穴文件删除完毕"
	fi
}
updst(){
	# stop
	screen -dm ~/steamcmd/steamcmd.sh +login anonymous +force_install_dir ~/dst +app_update 343050 validate +quit
	if [[ `echo $?` -eq 0 ]]; then
		echo -n "饥荒服务器游戏更新完成~"
	fi
}
statusm(){
    if [[ -n `ps -ef | grep -v grep |grep -v "dst.sh"|grep "Master"|sed -n '1P'|awk '{print $2}'` ]]; then
		echo -n " 😀 地上正在正常运行~ 😀"
    else
        echo -n " 😥 地上状态:关闭 😥"
	fi
}
statusc(){
    if [[ -n `ps -ef | grep -v grep |grep -v "dst.sh"|grep "Caves"|sed -n '1P'|awk '{print $2}'` ]]; then
		echo -n " 😀 洞穴正在正常运行~ 😀"
    else
        echo -n " 😥 洞穴状态:关闭 😥"
	fi
}

main(){
	read -p "Input your choose number: " choose
		case $choose in
			0 ) statusm
				;;
            00 ) statusc
                ;;
			1 ) goMaster
				;;
			2 ) goCaves
				;;
			3 ) stopMaster
				;;
			4 ) stopCaves
				;;
			5 ) restartm
				;;
			6 ) restartc
				;;
			7 ) updst
				;;
			8 ) del 0
				del 1
				;;
            80 ) del 0
                ;;
            81 ) del 1
				;;
            90 ) resetm
                ;;
			91 ) resetc
				;;
			* ) echo -e "\033[31mPlease enter the number before the following options!! \033[0m"
				main
				;;
		esac
}

main
