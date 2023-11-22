build:
	mvn clean package
	sudo rm -rf /opt/wildfly/standalone/deployments/*.war*
	sudo cp target/*.war /opt/wildfly/standalone/deployments

deploy:
	mvn clean package
	sudo rm -rf /home/kxrxh/Downloads/wildfly-29.0.1.Final/standalone/deployments/*.war*
	sudo cp target/*.war /home/kxrxh/Downloads/wildfly-29.0.1.Final/standalone/deployments