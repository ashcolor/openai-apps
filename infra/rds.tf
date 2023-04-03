################################
# RDS
################################
# DB Instance
resource "aws_db_instance" "postgres" {
  engine                                = "postgres"
  engine_version                        = "14.5"
  license_model                         = "postgresql-license"
  identifier                            = "${var.prefix}-db-instance"
  username                              = "root"
  password                              = "${var.db_root_password}"
  instance_class                        = var.db_instance_class
  storage_type                          = "gp3"
  allocated_storage                     = 20
  max_allocated_storage                 = 100
  multi_az                              = false
  publicly_accessible                   = true
  vpc_security_group_ids                = [aws_security_group.rds_sg.id]
  port                                  = 5432
  iam_database_authentication_enabled   = false
  db_name                               = "${var.db_database_name}"
#   parameter_group_name                  = aws_db_parameter_group.mysql.name
#   option_group_name                     = aws_db_option_group.mysql.name
#   backup_retention_period               = 7
  # JST 0:00-2:00
#   backup_window                         = "15:00-17:00"
#   copy_tags_to_snapshot                 = true
  storage_encrypted                     = true
#   monitoring_interval                   = 60
#   monitoring_role_arn                   = aws_iam_role.rds_monitoring_role.arn
#   enabled_cloudwatch_logs_exports       = ["error", "general", "slowquery"]
  auto_minor_version_upgrade            = false
  # JST Mon:02:00-Mon:03:00
  maintenance_window                    = "Sun:17:00-Sun:18:00"
  deletion_protection                   = false
  skip_final_snapshot                   = true
  apply_immediately                     = false

  tags = {
    Name = "${var.prefix}-db-instance"
  }

  lifecycle {
    ignore_changes = [password]
  }
}

output "rds_endpoint" {
  description = "The connection endpoint in address:port format."
  value       = aws_db_instance.postgres.endpoint
}
