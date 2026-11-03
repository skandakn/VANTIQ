from setuptools import setup, find_packages

setup(
    name="vantiq-python-sdk",
    version="1.0.0",
    author="VANTIQ Engineering Team",
    description="Official Python SDK for VANTIQ Anti-Predatory Financial Intelligence Platform",
    packages=find_packages(),
    install_requires=[
        "pydantic>=2.0.0",
        "requests>=2.28.0",
    ],
    classifiers=[
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.9",
)
