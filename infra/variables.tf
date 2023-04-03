# Common
variable "prefix" {
  description = "プロジェクトプリフィックス"
  type        = string
}

# RDS
variable "db_instance_class" {
  description = "DBインスタンスクラス"
  type        = string
}

variable "db_database_name" {
  description = "DBデータベース名"
  type        = string
}

variable "db_root_password" {
  description = "DBルートパスワード"
  type        = string
}
