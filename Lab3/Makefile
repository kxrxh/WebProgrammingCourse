build:
	mvn clean package
	sudo rm -rf /opt/wildfly/standalone/deployments/*.war*
	sudo cp target/*.war /opt/wildfly/standalone/deployments