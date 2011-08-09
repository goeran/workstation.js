#include "Screen.h"

#include <QLineEdit>
#include <QLabel>
#include <QPushButton>

Screen::Screen(QWidget* parent, const QString& title) 
  : QWidget(parent)
{
}

QWidget* Screen::addLabel()
{
  QLabel* label = new QLabel("", this);
  return label;
}

QWidget* Screen::addTextEdit()
{
  QLineEdit* lineEdit = new QLineEdit("", this);
  return lineEdit;
}

QWidget* Screen::addButton()
{
  QPushButton* pushButton = new QPushButton("", this); 
  return pushButton;
}
