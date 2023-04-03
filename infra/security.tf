################################
# Security group
################################
# RDS
resource "aws_security_group" "rds_sg" {
  name   = "${var.prefix}-rds-sg"
#   vpc_id = aws_vpc.vpc.id

  tags = {
    Name = "${var.prefix}-rds-sg"
  }
}

resource "aws_security_group_rule" "in_rds_from_any" {
  type                     = "ingress"
  from_port                = 5432
  to_port                  = 5432
  protocol                 = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
  security_group_id        = aws_security_group.rds_sg.id
}

resource "aws_security_group_rule" "in_any_from_rds" {
  type                     = "egress"
  from_port                = 0
  to_port                  = 0
  protocol                 = -1
  cidr_blocks = ["0.0.0.0/0"]
  security_group_id        = aws_security_group.rds_sg.id
}
