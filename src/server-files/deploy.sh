#!/bin/bash

# echo "Installing Docker"
# sudo apt-get update -y
# sudo apt-get install docker.io -y

daemonJson=$(cat <<'EOF'
{
  "iptables": true,
  "dns": ["8.8.8.8", "8.8.4.4"]
}
EOF
)

echo "Creating daemon.json"
sudo mkdir -p /etc/docker
sudo touch /etc/docker/daemon.json
echo "${daemonJson}" | sudo tee /etc/docker/daemon.json > /dev/null

echo "Restarting Docker"
sudo systemctl restart docker

echo "Initializing Docker Swarm"
sudo docker swarm init

echo "Deploying stack"
sudo docker stack deploy --compose-file docker-compose.yml stack

# echo "Installing Docker Compose"
# sudo apt-get install docker-compose -y
