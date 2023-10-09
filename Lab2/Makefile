build:
	mvn clean package

deploy: build
	sudo mv target/*.war /opt/wildfly/standalone/deployments/
	$(MAKE) clean

clean:
	mvn clean

helios: build
	mv target/*.war ~/wildfly-28*/standalone/deployments/
	$(MAKE) clean