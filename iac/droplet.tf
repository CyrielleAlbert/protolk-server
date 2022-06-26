resource "digitalocean_droplet" "protolk-server" {
    image  = "ubuntu-20-04-x64"
    name   = "protolk-server"
    region = "ams3"
    size   = "s-1vcpu-1gb"
    ssh_keys = [
      data.digitalocean_ssh_key.aurelien.id,
      data.digitalocean_ssh_key.cyrielle.id
    ]

    connection {
        host        = self.ipv4_address
        user        = "root"
        type        = "ssh"
        timeout     = "2m"
    }

    provisioner "remote-exec" {
        inline = [
            "apt update",
            "apt install -y nginx"
        ]
    }
}
