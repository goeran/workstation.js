#include "Screen.h"

#include <QLineEdit>
#include <QLabel>
#include <QVBoxLayout>
#include <QPushButton>

Screen::Screen(QWidget* parent, const QString& title) 
  : QWidget(parent)
{
  QVBoxLayout* layout = new QVBoxLayout;
  setLayout(layout);
}

QWidget* Screen::addLabel(const QString& title) 
{
  QLabel* label = new QLabel(title, this);
  layout()->addWidget(label);
  return label;
}

QWidget* Screen::addTextEdit(const QString& defaultText) 
{
  QLineEdit* lineEdit = new QLineEdit(defaultText, this);
  layout()->addWidget(lineEdit);
  return lineEdit;
}

QWidget* Screen::addButton(const QString& buttonText)
{
  QPushButton* pushButton = new QPushButton(buttonText, this); 
  layout()->addWidget(pushButton);
  return pushButton;
}
