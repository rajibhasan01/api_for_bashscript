#!/bin/bash

# Create a backup directory on the host machine
BACKUP_DIR="/home/rajibhasan/db_back_up/backup"
mkdir -p "$BACKUP_DIR"

# Define the container name and database name
CONTAINER_NAME="mongo-stickermaker-compessor-local"
DB_NAME="sticker_maker_compessor"

# Define the username and password
USERNAME="stickermaker_compessor_local"
PASSWORD="stickermaker_DBU9871s3571126"

# Get the current date and time
DATE=$(date +%Y-%m-%d_%H-%M-%S)

# Create a backup file name using the container name, database name, and current date and time
BACKUP_FILE="$BACKUP_DIR/${CONTAINER_NAME}_${DB_NAME}_${DATE}.dump"

# Run the mongodump command inside the container to backup the database and compress it as a zip file
docker exec "$CONTAINER_NAME" sh -c "mongodump --archive=/backup/${DB_NAME}.dump -u ${USERNAME} -p ${PASSWORD}" > "$BACKUP_DIR/backup.log" 2>&1

if grep -q "done dumping" "$BACKUP_DIR/backup.log"; then
  # Copy the backup file from the container to the host machine
  docker cp "$CONTAINER_NAME:/backup/${DB_NAME}.dump" "$BACKUP_FILE" >> "$BACKUP_DIR/backup.log" 2>&1

  if [ $? -eq 0 ]; then
    # Clean up the backup file inside the container
    docker exec "$CONTAINER_NAME" sh -c "rm /backup/${DB_NAME}.dump" >> "$BACKUP_DIR/backup.log" 2>&1

    # Print a success message
    echo "$BACKUP_FILE, $BACKUP_DIR/backup.log,  Backup of $DB_NAME database from $CONTAINER_NAME container is completed and saved as $BACKUP_FILE"
  else
    # Print an error message
    echo "$BACKUP_DIR/backup.log, Failed to copy backup file from container to host machine. See log file for details."
  fi
else
  # Print an error message
  echo "$BACKUP_DIR/backup.log, mongodump command failed. See log file for details."
fi