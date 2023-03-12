# Digital Ocean Droplet IaC

## Sources

* https://www.digitalocean.com/community/tutorials/how-to-use-terraform-with-digitalocean

## Install Terraform

```bash
curl -o ~/terraform.zip https://releases.hashicorp.com/terraform/1.1.3/terraform_1.1.3_linux_amd64.zip
sudo mkdir /opt/terraform
sudo unzip ~/terraform.zip -d ~/opt/terraform
```

Add Digital Ocean token:

```bash
export DO_PAT="your personal token"
```

## Initialize Terraform for the project

```bash
terraform init
```

## Create the droplet

First add your ssh key to your ssh agent:

```bash
ssh-add
```

Terraform plan:

```bash
terraform plan -var "do_token=${DO_PAT}" 
```

Terraform apply:

```bash
terraform apply -var "do_token=${DO_PAT}"
```

After terraform apply succeeds, you should be able to connect to the server and to see the nginx home page.

## Destroy the droplet

```bash
terraform destroy -var "do_token=${DO_PAT}"
```
