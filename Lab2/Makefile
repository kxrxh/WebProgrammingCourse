deploy: build
	sudo mv target/*.war /opt/wildfly/standalone/deployments/
	$(MAKE) clean

build:
	mvn clean package

clean:
	mvn clean

helios: build
	mv target/*.war ~/wildfly-28*/standalone/deployments/